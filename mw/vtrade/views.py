from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse


def get_user(request):
    user_input = request.GET.get("input")

    return user


def post_listing(request):
    print("test")
