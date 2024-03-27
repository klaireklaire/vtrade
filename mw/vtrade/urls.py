from django.urls import path
from .views import *

urlpatterns = [
    path("get_user/", get_user, name="get_user"),
    path("add_user/", add_user, name="add_user"),
    path("forgot_password/", forgot_password, name="forgot_password"),
    path("reset_password/", reset_password, name="reset_password"),
    path("update_user/", update_user, name="update_user"),
    path("remove_user/", remove_user, name="remove_user"),
    path("post_listing/", post_listing, name="post_listing"),
    path("filter_price/", filter_price, name="filter_price"),
    path("display_top_sale/", display_top_sale, name="display_top_sale"),
    path("display_top_request/", display_top_request, name="display_top_request"),
    path("display_recent_post/", display_recent_post, name="display_recent_post"),
    path("get_items/", get_items, name="get_items"),
    path("get_product_info/", get_product_info, name="get_product_info"),
    path("buy_product/", buy_product, name="buy_product"),
]
