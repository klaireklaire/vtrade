from django.urls import path
from .views import post_listing

urlpatterns = [path("post_listing/", post_listing, name="post_listing")]
