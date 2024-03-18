from django.urls import path
from .views import post_listing, get_user, add_user, update_user, remove_user

urlpatterns = [
    path("post_listing/", post_listing, name="post_listing"),
    path("get_user/", get_user, name="get_user"),
    path("add_user/", add_user, name="add_user"),
    path("update_user/", update_user, name="update_user"),
    path("remove_user/", remove_user, name="remove_user"),
]
