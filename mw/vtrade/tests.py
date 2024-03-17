from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
import hashlib


class AddUserTestCase(TestCase):
    def test_add_user(self):
        # Define the user input data
        user_input = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "username": "johndoe",
            "password": "password123",
        }

        # Calculate the hashed password
        hashed_password = hashlib.sha256(
            user_input["password"].replace(" ", "").encode()
        ).hexdigest()

        # Make a POST request to the add user route
        response = self.client.post(reverse("add_user_route"), user_input)

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check if the user is created successfully
        self.assertTrue(
            get_user_model().objects.filter(username=user_input["username"]).exists()
        )

        # You can add more assertions as needed
