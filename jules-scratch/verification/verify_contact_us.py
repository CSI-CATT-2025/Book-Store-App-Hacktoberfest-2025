from playwright.sync_api import Page, expect

def test_contact_us_page(page: Page):
    """
    This test verifies the UI and functionality of the Contact Us page.
    """
    # 1. Arrange: Go to the Contact Us page.
    page.goto("http://localhost:5173/Contact")

    # 2. Assert: Check for the new UI elements.
    expect(page.get_by_role("heading", name="Contact Us")).to_be_visible()
    expect(page.locator("svg").first).to_be_visible()

    # 3. Act: Test form validation by submitting an empty form.
    page.get_by_role("button", name="Send Message").click()

    # 4. Assert: Check for validation error messages.
    expect(page.get_by_text("Name is required")).to_be_visible()
    expect(page.get_by_text("Email is required")).to_be_visible()
    expect(page.get_by_text("Message is required")).to_be_visible()

    # 5. Act: Fill out the form with valid data.
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_placeholder("Enter your email").fill("jules@example.com")
    page.get_by_placeholder("Type your message").fill("This is a test message.")

    # 6. Act: Submit the form.
    page.get_by_role("button", name="Send Message").click()

    # 7. Assert: Check for the success toast message.
    expect(page.get_by_text("Your message has been sent!")).to_be_visible()

    # 8. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")