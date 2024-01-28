from django.db import models
from django.db.models import Avg
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db import connection
from datetime import datetime

class AppImage(models.Model):

    @classmethod
    def post_profile_image(cls, user_id, image):
        unix_timestamp = int(datetime.now().timestamp())
        file_path = f"profileimages/{image.name}-{user_id}-{unix_timestamp}"
        
        # Save the image to the local storage (assuming 'media' is configured in your Django settings)
        image_field = cls._save_image(file_path, image.data)

        # Update the user's profile image field in the database
        cls.objects.filter(id=user_id).update(profileimage=image_field, updatedat=datetime.now())

        # Retrieve and return the updated user object
        updated_user = cls.objects.get(id=user_id)
        return updated_user

    @classmethod
    def post_listing_images(cls, listing_id, images):
        image_fields = []

        for i, image in enumerate(images):
            file_path = f"productimages/{image.name}-{listing_id}-{i + 1}"
            
            # Save each image to the local storage
            image_field = cls._save_image(file_path, image.data)
            image_fields.append(image_field)

        # Create a new listing images record in the database
        listing_images = cls.objects.create(listing_id=listing_id, **dict(zip([f"image{i+1}" for i in range(len(image_fields))], image_fields)))

        # Retrieve and return the created listing images
        return listing_images

    @staticmethod
    def _save_image(file_path, image_data):
        # Save the image to the local storage (assuming 'media' is configured in your Django settings)
        with open(f"media/{file_path}", "wb") as file:
            file.write(image_data)

        # Return the image field for database storage
        return file_path

    @classmethod
    def update_listing_images(cls, listing_id, images):
        # Implement the logic for updating listing images in the local storage and database
        pass

    @classmethod
    def delete_listing_images(cls, listing_id, images):
        # Implement the logic for deleting listing images from local storage and database
        pass

    @classmethod
    def delete_profile_image(cls, user_id):
        # Implement the logic for deleting the profile image from local storage and updating the database
        pass


class Listing(models.Model):

    user_id = models.IntegerField()
    listingtype = models.IntegerField()
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    form = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    minprice = models.DecimalField(max_digits=10, decimal_places=2)
    maxprice = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=255)
    payment = models.CharField(max_length=255)
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    # Additional fields for product type listings
    category = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    condition = models.CharField(max_length=255, blank=True, null=True)

    # Additional fields for user information
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    profileimage = models.CharField(max_length=255, blank=True, null=True)

    @classmethod
    def get_listings(cls):
        return cls.objects.all()

    @classmethod
    def get_listing_by_id(cls, listing_id):
        return cls.objects.get(id=listing_id)

    @classmethod
    def get_listings_by_user(cls, user_id):
        return cls.objects.filter(user_id=user_id)

    @classmethod
    def delete_listing(cls, listing_id):
        cls.objects.filter(id=listing_id).delete()

    @classmethod
    def edit_listing(cls, update, listing_id):
        # Implement the logic for editing a listing in the database
        pass

    @classmethod
    def filter_listings(cls, filter):
        # Implement the logic for filtering listings in the database
        pass

    @classmethod
    def filter_location(cls, location):
        return cls.objects.filter(location__icontains=location)

    @classmethod
    def filter_title(cls, title):
        return cls.objects.filter(title__icontains=title)

    @classmethod
    def filter_form(cls, form):
        return cls.objects.filter(form__icontains=form)

    @classmethod
    def filter_price(cls, min_price, max_price):
        return cls.objects.filter((Q(price__gt=min_price) & Q(price__lt=max_price)) | (Q(minprice__gt=min_price) & Q(maxprice__lt=max_price)))

    @classmethod
    def filter_status(cls, status):
        return cls.objects.filter(status__icontains=status)

    @classmethod
    def filter_payment(cls, payment):
        return cls.objects.filter(payment__icontains=payment)

    @classmethod
    def filter_type(cls, type):
        return cls.objects.filter(type__icontains=type)

    @classmethod
    def filter_category(cls, category):
        return cls.objects.filter(category__icontains=category)

    @classmethod
    def filter_condition(cls, condition):
        return cls.objects.filter(condition__icontains=condition)

    @classmethod
    def post_listing(cls, listing, images):
        # Implement the logic for posting a new listing to the database
        pass

    def __str__(self):
        return self.title

# users might not work correctly: To convert the provided JavaScript class into a Django model, you can follow the steps below. However, please note that Django models are typically associated with database tables, and they don't include methods like the ones provided in your JavaScript class. Django has a separate layer for handling authentication and user-related functionality, so some of the methods in your class might be handled differently in a Django context.
class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    classyear = models.IntegerField(null=True)
    profileimage = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    # Add other fields as needed

    def make_public_user(self):
        return {
            'id': self.id,
            'firstname': self.first_name,
            'lastname': self.last_name,
            'email': self.email,
            'createdat': self.date_joined,
            'updatedat': self.date_updated,
            'bio': self.bio,
            'classyear': self.classyear,
            'profileimage': self.profileimage.url if self.profileimage else None
        }


class Transaction(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    listing_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_transactions')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seller_transactions')
    time = models.DateTimeField(auto_now_add=True)

    @classmethod
    def get_transactions(cls):
        return cls.objects.all()

    @classmethod
    def get_transactions_by_user(cls, user_id):
        return cls.objects.filter(user_id=user_id)

    @classmethod
    def get_transaction_by_id(cls, transaction_id):
        return


class Service(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listingtype = models.IntegerField()
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    form = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    minprice = models.DecimalField(max_digits=10, decimal_places=2)
    maxprice = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=255)
    payment = models.CharField(max_length=255)

    image1 = models.ImageField(upload_to='service_images/', blank=True, null=True)
    image2 = models.ImageField(upload_to='service_images/', blank=True, null=True)
    image3 = models.ImageField(upload_to='service_images/', blank=True, null=True)
    image4 = models.ImageField(upload_to='service_images/', blank=True, null=True)
    image5 = models.ImageField(upload_to='service_images/', blank=True, null=True)
    image6 = models.ImageField(upload_to='service_images/', blank=True, null=True)
    image7 = models.ImageField(upload_to='service_images/', blank=True, null=True)

    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    @classmethod
    def get_services(cls):
        return cls.objects.filter(listingtype=1)

    @classmethod
    def get_service_by_id(cls, service_id):
        return cls.objects.get(pk=service_id, listingtype=1)

    @classmethod
    def get_services_by_user(cls, user_id):
        return cls.objects.filter(user_id=user_id, listingtype=1)


class Review(models.Model):
    review = models.TextField()
    listing_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating_id = models.IntegerField()
    seller_id = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    @classmethod
    def get_user_reviews(cls, user_id):
        return cls.objects.filter(user_id=user_id)

    @classmethod
    def get_listing_reviews(cls, listing_id):
        return cls.objects.filter(listing_id=listing_id)

    @classmethod
    def get_review(cls, review_id):
        return cls.objects.get(pk=review_id)

    @classmethod
    def post_review(cls, review_data):
        # Add logic for posting a review
        pass

    @classmethod
    def edit_review(cls, update_data):
        # Add logic for editing a review
        pass

    @classmethod
    def delete_review(cls, review_id):
        cls.objects.filter(pk=review_id).delete()

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listingtype = models.IntegerField()
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    form = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    minprice = models.DecimalField(max_digits=10, decimal_places=2)
    maxprice = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=255)
    payment = models.CharField(max_length=255)

    # Additional fields for listingtype == 0
    category = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    condition = models.CharField(max_length=255, blank=True, null=True)

    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    @classmethod
    def get_products(cls):
        return cls.objects.filter(listingtype=0)

    @classmethod
    def get_product_by_id(cls, product_id):
        return cls.objects.get(pk=product_id, listingtype=0)

    @classmethod
    def get_products_by_user(cls, user_id):
        return cls.objects.filter(user_id=user_id, listingtype=0)


class Rating(models.Model):
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    listing_id = models.IntegerField()
    seller_id = models.IntegerField()
    user_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @classmethod
    def get_user_rating(cls, user_id):
        return cls.objects.filter(seller_id=user_id).aggregate(Avg('rating'))

    @classmethod
    def get_listing_rating(cls, listing_id):
        return cls.objects.filter(listing_id=listing_id).aggregate(Avg('rating'))

    @classmethod
    def get_rating(cls, rating_id):
        return cls.objects.get(id=rating_id)

    @classmethod
    def post_rating(cls, rating):
        return cls.objects.create(
            rating=rating['rating'],
            listing_id=rating['listing_id'],
            seller_id=rating['seller_id'],
            user_id=rating['user_id']
        )

    @classmethod
    def edit_rating(cls, update, rating_id):
        rating_instance = cls.objects.get(id=rating_id)
        rating_instance.rating = update['rating']
        rating_instance.save()
        return rating_instance

    @classmethod
    def delete_rating(cls, rating_id):
        cls.objects.filter(id=rating_id).delete()


