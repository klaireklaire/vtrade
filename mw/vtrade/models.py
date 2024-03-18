from django.db import models
from django.db.models import Avg
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import connection
from datetime import datetime


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_("Email address"), unique=True, null=False)
    bio = models.TextField(blank=True, null=True)
    # come back to, what years do we want to allow users
    classyear = models.IntegerField(
        _("Class year"),
        validators=[
            MinValueValidator(datetime.datetime.now().year),
            MaxValueValidator(datetime.datetime.now().year + 4),
        ],
        blank=False,
        null=False,
    )

    profileimage = models.ForeignKey(AppImage, on_delete=models.CASCADE)
    createdate = models.DateTimeField(_("Created at"), auto_now_add=True)
    updatedate = models.DateTimeField(_("Updated at"), auto_now=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = "Custom User"
        verbose_name_plural = "Custom Users"


class AppImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.URLField(_("Image URL"))
    createdate = models.DateTimeField(_("Created at"), auto_now_add=True)
    updatedate = models.DateTimeField(_("Updated at"), auto_now=True)

    def __str__(self):
        return f"Image {self.id}"


class Listing(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    listingtype = models.BooleanField(
        _("Listing type"), default=False
    )  # 0: product, 1: service
    title = models.CharField(_("Title"), max_length=255)
    location = models.CharField(_("Location"), max_length=255)
    description = models.TextField(_("Description"), blank=True, null=True)
    form = models.CharField(
        _("Form"), max_length=255
    )  # request (I want to buy something)/provide (I am selling something)
    price = models.DecimalField(
        _("Price"),
        validators=[
            MinValueValidator(0),
        ],
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )
    minprice = models.DecimalField(
        _("Min Price"),
        validators=[
            MinValueValidator(0),
        ],
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )
    maxprice = models.DecimalField(
        _("Max Price"),
        validators=[
            MinValueValidator(0),
        ],
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )
    status = models.BooleanField(default=True)
    paymentmethod = models.CharField(max_length=255)
    createdate = models.DateTimeField(_("Created at"), auto_now_add=True)
    updatedate = models.DateTimeField(_("Updated at"), auto_now=True)

    # Additional fields for product type listings
    category = models.CharField(_("Category"), max_length=255, blank=False, null=False)
    # type = models.CharField(_("Type"), max_length=255, blank=False, null=False)
    condition = models.CharField(
        _("Condition"), max_length=255, blank=False, null=False
    )
    images = models.ManyToManyField(AppImage)

    def __str__(self):
        return self.title


class Transaction(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    listing_id = models.IntegerField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_transactions"
    )
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="seller_transactions"
    )
    time = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    review = models.TextField()
    listing_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating_id = models.IntegerField()
    seller_id = models.IntegerField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)


class Rating(models.Model):
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    listing_id = models.IntegerField()
    seller_id = models.IntegerField()
    user_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# class Product(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     listingtype = models.IntegerField()
#     title = models.CharField(max_length=255)
#     location = models.CharField(max_length=255)
#     description = models.TextField(blank=True, null=True)
#     form = models.CharField(max_length=255)
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     minprice = models.DecimalField(max_digits=10, decimal_places=2)
#     maxprice = models.DecimalField(max_digits=10, decimal_places=2)
#     status = models.CharField(max_length=255)
#     payment = models.CharField(max_length=255)

#     # Additional fields for listingtype == 0
#     category = models.CharField(max_length=255, blank=True, null=True)
#     type = models.CharField(max_length=255, blank=True, null=True)
#     condition = models.CharField(max_length=255, blank=True, null=True)

#     createdat = models.DateTimeField(auto_now_add=True)
#     updatedat = models.DateTimeField(auto_now=True)


# class Service(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     listingtype = models.IntegerField()
#     title = models.CharField(max_length=255)
#     location = models.CharField(max_length=255)
#     description = models.TextField(blank=True, null=True)
#     form = models.CharField(max_length=255)
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     minprice = models.DecimalField(max_digits=10, decimal_places=2)
#     maxprice = models.DecimalField(max_digits=10, decimal_places=2)
#     status = models.CharField(max_length=255)
#     payment = models.CharField(max_length=255)

#     image1 = models.ImageField(upload_to="service_images/", blank=True, null=True)
#     image2 = models.ImageField(upload_to="service_images/", blank=True, null=True)
#     image3 = models.ImageField(upload_to="service_images/", blank=True, null=True)
#     image4 = models.ImageField(upload_to="service_images/", blank=True, null=True)
#     image5 = models.ImageField(upload_to="service_images/", blank=True, null=True)
#     image6 = models.ImageField(upload_to="service_images/", blank=True, null=True)
#     image7 = models.ImageField(upload_to="service_images/", blank=True, null=True)

#     createdat = models.DateTimeField(auto_now_add=True)
#     updatedat = models.DateTimeField(auto_now=True)
