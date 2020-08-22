import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
import json
import re
import argparse
# op = webdriver.ChromeOptions()
# op.add_argument('headless')
driver = webdriver.Chrome(ChromeDriverManager().install())
login_url='https://sia.unal.edu.co/ServiciosApp'
driver.get(login_url)   
HOUR = 2
CLASSROOM = 3
GROUP=10
PROFESSOR = 11
def clear_hour(hour):
    hour = hour.replace('H','')
    hour=re.sub(r'\s+',' ', hour, re.I|re.A)
    hour = hour.strip()
    hour = hour.split('-')
    return [h.strip() for h in hour]

def clear_classroom(room):
    return room.split('-')

def clear_group(group):
    group=group.replace(' ','')
    return re.findall(r'\((\d+)\)',group)[0]

def login_sia(driver, user, password):
    input_user = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,'//input[@name="username"]'))
    )
    input_pass = driver.find_element(By.XPATH, '//input[@name="password"]')
    input_user.send_keys(user)

    input_pass.send_keys(password)
    boton = driver.find_element(By.XPATH,'//input[@name="submit"]')
    boton.click()
    return driver

def go_to_horario(driver):
    apoyo_academcio = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH,'//td[@title="Apoyo Académico"]'))
    )
    apoyo_academcio.click()
    mi_horario = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH,'//a[@title="Mi horario"]'))
    )
    mi_horario.click()


def go_to_list(driver,sleep_time=0):
    time.sleep(1)
    siguiente = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,'//div[@title="Siguiente"]//a'))
    )
    siguiente.click()
    time.sleep(5)
    lista = WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH,'//div[@title="Lista"]'))
    )
    lista.click()
    return driver



def update_course(old_course, new_course):
    for k in new_course.keys():
        if new_course[k] is None:
            continue
        old_course[k]=new_course[k]
    return old_course
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-u','--user',help="Su usuario unal",type=str)
    parser.add_argument('-p','--password', help='Su contraseña', type=str)
    args = parser.parse_args()
    login_sia(driver, args.user, args.password)
    go_to_horario(driver)

    go_to_list(driver)


    item = WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH,'//tr[contains(@class,"af_calendar_list-row")]'))
    )
    info_courses={}
    courses_len = len(driver.find_elements(By.XPATH,'//tr[contains(@class,"af_calendar_list-row")]'))
    current_day = ""
    for i in range(courses_len):
        load = False
        tries = 0
        while not load:
            tries +=1
            if tries > 10:
                driver.refresh()
                go_to_horario(driver)
                go_to_list(driver,1)
                tries = 0
                continue
            courses = driver.find_elements(By.XPATH,'//tr[contains(@class,"af_calendar_list-row")]')
            course = courses[i]
            day = course.find_elements(By.XPATH,'.//th[@class="af_calendar_list-day-of-week-column af_calendar_list-cell"]')
            if len(day) !=0:
                current_day = day[0].text.strip()

            courses = driver.find_elements(By.XPATH,'//a[contains(@class,"af_calendar_list-title-link")]')
            course = courses[i]
            course.click()

            time.sleep(2)
            container = WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.XPATH,'//div[@data-afr-fid="f1"]'))
            )
            name =None
            try:
                name = container.find_element(By.XPATH,'.//div[@class="af_dialog_title"]')
            except:
                continue
            if name!= None:
                spans = container.find_elements(By.XPATH, './/td[@class="af_dialog_content"]//span')
                i = 0
                professor = None
                if len(spans)>11:
                    professor = spans[PROFESSOR].text
                hour = clear_hour(spans[HOUR].text)
                classroom = clear_classroom(spans[CLASSROOM].text)
                group = clear_group(spans[GROUP].text)
                name_splited = name.text.split(' ')
                code = name_splited[0]
                name_course = ' '.join(name_splited[1:])
                info_course =   {'name':name_course,
                                'hour':hour,
                                'group':group,
                                'classroom':classroom,
                                'professor':professor}
                if code not in info_courses.keys():
                    info_courses[code]={}
                if current_day in info_courses[code].keys():
                    info_courses[code][current_day] = update_course( info_courses[code][current_day],info_course)
                else:
                    info_courses[code][current_day]=info_course
            button = WebDriverWait(container,20).until(
                EC.presence_of_element_located((By.XPATH, '//button[@class="af_dialog_footer-button-affirmative af_dialog_footer-button p_AFTextOnly"]'))
            )
            try:
                button.click()
            except:
                continue
            load = True

    with open("horarios.json","w") as f:
        json.dump(info_courses, f, indent=2)