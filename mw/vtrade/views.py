from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from . import routes


def get_user(request):
    user_input = request.GET.get("input")
    response = routes.get_user(user_input)
    return JsonResponse(response)


def add_user(request):
    user_input = request.GET.get("input")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.add_user(user_input)

    return JsonResponse(response)


def update_user(request):
    user_input = request.GET.get("input")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.update_user(user_input)

    return JsonResponse(response)


def delete_user(request):
    user_input = request.GET.get("input")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.delete_user(user_input)

    return JsonResponse(response)


def post_listing(request):
    print("test")
