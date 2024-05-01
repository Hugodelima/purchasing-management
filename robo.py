from selenium import webdriver
from selenium.webdriver.common.by import By
from faker import Faker
import random


def generate_cnpj():                                                       
    def calculate_special_digit(l):                                             
        digit = 0                                                               
                                                                                
        for i, v in enumerate(l):                                               
            digit += v * (i % 8 + 2)                                            
                                                                                
        digit = 11 - digit % 11                                                 
                                                                                
        return digit if digit < 10 else 0                                       
                                                                                
    cnpj =  [1, 0, 0, 0] + [random.randint(0, 9) for x in range(8)]             
                                                                                
    for _ in range(2):                                                          
        cnpj = [calculate_special_digit(cnpj)] + cnpj                           
                                                                                
    return '%s%s.%s%s%s.%s%s%s/%s%s%s%s-%s%s' % tuple(cnpj[::-1])


driver = webdriver.Firefox()

url = 'http://localhost:4000/fornecedores/cadastrar'

numero_de_envios = 10


for _ in range(numero_de_envios):
    driver.get(url)

    fake = Faker()
    driver.find_element(By.ID, 'NOME').send_keys(fake.name())
    driver.find_element(By.ID, 'RAZAO_SOCIAL').send_keys(fake.company())
    driver.find_element(By.ID, 'CNPJ').send_keys(generate_cnpj())
    driver.find_element(By.ID, 'IE_STATUS').send_keys(str(random.choice([True, False])).lower())
    driver.find_element(By.ID, 'IE_NUMERO').send_keys(fake.random_number(digits=8))
    driver.find_element(By.ID, 'CONTR_ICMS').send_keys(str(random.choice([True, False])).lower())
    driver.find_element(By.ID, 'EMAIL').send_keys(fake.email())
    driver.find_element(By.ID, 'TELEFONE').send_keys(fake.phone_number())
    driver.find_element(By.ID, 'CEP').send_keys(fake.postcode())
    driver.find_element(By.ID, 'ENDERECO').send_keys(fake.street_address())
    driver.find_element(By.ID, 'ENDEREDO_NUMERO').send_keys(fake.building_number())
    driver.find_element(By.ID, 'BAIRRO').send_keys(fake.city_suffix())

   
    driver.find_element(By.CSS_SELECTOR, 'input[type="submit"]').click()


    driver.get(url)
driver.get("http://localhost:4000/fornecedores")

print(random.choice([True, false]))