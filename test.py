from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time

PORTFOLIO_URL = "http://localhost:3000/"

EXPECTED_TITLE = "Goutham Kumar"

LINK_TEXT_TO_CLICK = "Projects"


service = Service(r"C:\Users\revku\Documents\my_portfolio\chromedriver.exe")
driver = webdriver.Chrome(service=service)

print("--- Starting Portfolio Test on localhost ---")

try:
    print(f"Navigating to {PORTFOLIO_URL}...")
    driver.get(PORTFOLIO_URL)
    driver.maximize_window()
    time.sleep(2)  # Wait 2 seconds for the page to fully load

    # TEST 1: Verify the page title
    print("\n[TEST 1] Verifying Page Title...")
    actual_title = driver.title
    print(f"  -> Found title: '{actual_title}'")
    assert EXPECTED_TITLE in actual_title, f"Title MISMATCH! Expected '{EXPECTED_TITLE}' but got '{actual_title}'"
    print("  ✅ PASSED: Page title is correct.")

    # TEST 2: Find and click a navigation link
    print(f"\n[TEST 2] Clicking the '{LINK_TEXT_TO_CLICK}' link...")
    link_element = driver.find_element(By.LINK_TEXT, LINK_TEXT_TO_CLICK)
    print(f"  -> Found link with text: '{LINK_TEXT_TO_CLICK}'")
    link_element.click()
    time.sleep(2) # Wait for the next page or section to load
    print(f"  ✅ PASSED: Successfully clicked on the '{LINK_TEXT_TO_CLICK}' link.")

    print("\nAll tests passed successfully! 🎉")

except Exception as e:
    print(f"\n❌ A TEST FAILED: {e}")

finally:
    # Step 3: Close the browser window
    print("\nClosing the browser.")
    driver.quit()