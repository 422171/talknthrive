
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, ElementNotInteractableException
import time


driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)
BASE_URL = "http://localhost:3000"

def open_home():
    print("[INFO] Opening Home Page")
    driver.get(f"{BASE_URL}/")
    wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))

def register_user(name, email):
    print("[INFO] Registering user")
    driver.get(f"{BASE_URL}/register")

    try:
        name_input = wait.until(EC.presence_of_element_located((By.ID, "name")))
        email_input = wait.until(EC.presence_of_element_located((By.ID, "email")))
        
        name_input.clear()
        name_input.send_keys(name)

        email_input.clear()
        email_input.send_keys(email)

        register_button = wait.until(EC.element_to_be_clickable((By.TAG_NAME, "button")))
        register_button.click()

    except (TimeoutException, NoSuchElementException, ElementNotInteractableException) as e:
        print("[ERROR] Failed to register:", str(e))

def login_user(email):
    print("[INFO] Logging in user")
    driver.get(f"{BASE_URL}/login")

    try:
        email_input = wait.until(EC.presence_of_element_located((By.ID, "email")))
        email_input.clear()
        email_input.send_keys(email)

        login_button = wait.until(EC.element_to_be_clickable((By.TAG_NAME, "button")))
        login_button.click()
    except Exception as e:
        print("[ERROR] Login failed:", str(e))

def test_dashboard_buttons():
    print("[INFO] Testing Dashboard buttons")
    driver.get(f"{BASE_URL}/dashboard")

    try:
        en_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '(EN)')]")))
        en_button.click()
        time.sleep(2)

        te_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '(TE)')]")))
        te_button.click()
        time.sleep(5)
    except Exception as e:
        print("[ERROR] While clicking buttons:", str(e))

def run_test():
    try:
        open_home()
        register_user("Test User", "testuser@example.com")
        login_user("testuser@example.com")
        test_dashboard_buttons()
        print("[SUCCESS] Automation completed successfully.")
    except Exception as e:
        print("[FATAL ERROR]", e)
    finally:
        driver.quit()

# Start test
run_test()
