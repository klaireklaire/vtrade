from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from . import routes


def get_user(request):
    user_input = request.GET.get("input")
    response = routes.add_user(user_input)


def post_listing(request):
    print("test")
