from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from models import Listing, AppImage
from views import post_listing

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


class PostListingTestCase(TestCase):
    def test_post_listing_valid_input(self):
        # Mock user input
        user_input = [
            "url1",
            "url2",
            "url3",
            "url4",
            "url5",
            "url6",
            "url7",
            "Title",
            "Category",
            "Condition",
            "Payment Method",
            "Description",
            "Location",
            "Form",
            0,
            True,
            100,
        ]
        user_input2 = [
            "url1",
            "url2",
            "url3",
            "url4",
            "url5",
            "url6",
            "url7",
            "Title",
            "Category",
            "Condition",
            "Payment Method",
            "Description",
            "Location",
            "Form",
            0,
            True,
            12,
            50,
        ]

        # Call the view function
        response = post_listing(user_input)

        # Check if the response is successful
        self.assertEqual(response.status_code, 200)

        # Check if the listing is created successfully
        self.assertEqual(Listing.objects.count(), 1)
        listing = Listing.objects.first()
        self.assertEqual(listing.title, "Title")

        response = post_listing(user_input2)
        # Check if the response is successful
        self.assertEqual(response.status_code, 200)

        # Check if the listing is created successfully
        self.assertEqual(Listing.objects.count(), 2)

        # Check if image instances are created and associated with the listing
        self.assertEqual(AppImage.objects.count(), 7)
        for idx, img_url in enumerate(user_input[:7]):
            self.assertTrue(AppImage.objects.filter(image_url=img_url).exists())
            self.assertIn(AppImage.objects.get(image_url=img_url), listing.images.all())

    def test_post_listing_invalid_input(self):
        # Mock invalid user input
        invalid_user_inputs = [
            [],  # Empty input
            [
                "url1",
                "url2",
                "url3",
                "url4",
                "url5",
                "url6",
                "url7",
                "Title",
                "Category",
            ],  # Missing fields
            # Add more invalid inputs as needed
        ]

        for invalid_input in invalid_user_inputs:
            response = post_listing(invalid_input)
            self.assertEqual(response.status_code, 400)
            self.assertIn("error", response.json())
