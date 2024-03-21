from django.db import models
from django.db.models import Avg
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from django.core.validators import MinValueValidator, MaxValueValidator
from phonenumber_field.modelfields import PhoneNumberField
from django.db import connection
from datetime import datetime
import uuid


class AppImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.URLField(_("Image URL"))
    create_date = models.DateTimeField(_("Created at"), auto_now_add=True)
    update_date = models.DateTimeField(_("Updated at"), auto_now=True)

    def __str__(self):
        return f"Image {self.id}"


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_("Email address"), unique=True, null=False)
    bio = models.TextField(blank=True, null=True)
    # come back to, what years do we want to allow users
    class_year = models.IntegerField(
        _("Class year"),
        validators=[
            MinValueValidator(datetime.datetime.now().year),
            MaxValueValidator(datetime.datetime.now().year + 4),
        ],
        blank=False,
        null=False,
    )

    profile_image = models.ForeignKey(AppImage, on_delete=models.CASCADE)
    phone_number = PhoneNumberField(blank=True, null=True)
    create_date = models.DateTimeField(_("Created at"), auto_now_add=True)
    update_date = models.DateTimeField(_("Updated at"), auto_now=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = "Custom User"
        verbose_name_plural = "Custom Users"


class Listing(models.Model):
    STATUS_DENIED = 0
    STATUS_ACCEPTED = 1
    STATUS_PENDING = 2

    STATUS_CHOICES = [
        (STATUS_DENIED, "Denied"),
        (STATUS_ACCEPTED, "Accepted"),
        (STATUS_PENDING, "Pending"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    listing_type = models.BooleanField(
        _("Listing type"), default=False
    )  # 0: product, 1: service
    title = models.CharField(_("Title"), max_length=255)
    location = models.CharField(_("Location"), max_length=255)
    description = models.TextField(_("Description"), blank=True, null=True)
    form = models.BooleanField(
        _("Form"), default=False
    )  # 0: request (I want to buy something), 1: provide (I am selling something)
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

    status = models.IntegerField(choices=STATUS_CHOICES, default=STATUS_PENDING)
    payment_method = models.CharField(max_length=255)
    create_date = models.DateTimeField(_("Created at"), auto_now_add=True)
    update_date = models.DateTimeField(_("Updated at"), auto_now=True)

    category = models.CharField(_("Category"), max_length=255, blank=False, null=False)
    condition = models.CharField(
        _("Condition"), max_length=255, blank=False, null=False
    )
    images = models.ManyToManyField(AppImage)
    clicked = models.IntegerField(
        _("Number of interaction"),
        validators=[MinValueValidator(0)],
        blank=True,
        null=False,
    )

    def __str__(self):
        return self.title


class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            MinValueValidator(0),
        ],
    )
    listing_id = models.ForeignKey(Listing, on_delete=models.CASCADE)
    user_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="user_transactions"
    )
    seller_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="seller_transactions"
    )
    time = models.DateTimeField(auto_now_add=True)


class MyBids(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    listing_id = models.ForeignKey(Listing, on_delete=models.CASCADE)
    offered_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            MinValueValidator(0),
        ],
    )
    my_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField(blank=True, null=True)


class MySales(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    listing_id = models.ForeignKey(Listing, on_delete=models.CASCADE)
    my_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class MyPurchase(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    listing_id = models.ForeignKey(Listing, on_delete=models.CASCADE)
    my_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


# come back to this
class Rating(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    listing_id = models.IntegerField()
    seller_id = models.IntegerField()
    user_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# come back to this
class Events(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
