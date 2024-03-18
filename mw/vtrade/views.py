from django.http import JsonResponse
from . import routes


def get_user(request):
    user_input = request.GET.get("user_input", "").split("+")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.get_user(user_input)
    return JsonResponse(response)


def add_user(request):
    user_input = request.GET.get("user_input", "")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.add_user(user_input)

    return JsonResponse(response)


def update_user(request):
    user_input = request.GET.get("user_input", "")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.update_user(user_input)

    return JsonResponse(response)


def remove_user(request):
    user_input = request.GET.get("user_input", "")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.delete_user(user_input)

    return JsonResponse(response)


def forgot_password(request):
    user_input = request.GET.get("user_input", "")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.forgot_password(user_input)

    return JsonResponse(response)


def reset_password(request):
    user_input = request.GET.get("user_input", "")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.reset_password(user_input)

    return JsonResponse(response)


def post_listing(request):
    user_input = request.GET.get("user_input", "").split("+")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.post_listing(user_input)

    return JsonResponse(response)


def filter_price(request):
    user_input = request.GET.get("user_input", "").split("+")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.filter_price(user_input)

    return JsonResponse(response)


def get_items(request):
    user_input = request.GET.get("user_input", "").split("+")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.get_items(user_input)

    return JsonResponse(response)


def display_top_sale():
    response = routes.display_top_sale()
    return JsonResponse(response)


def display_top_request():
    response = routes.display_top_request()
    return JsonResponse(response)


def display_recent_post():
    response = routes.display_recent_post()
    return JsonResponse(response)


def remove_listing(request):
    return


def update_listing(request):
    return


def get_product_info(request):
    user_input = request.GET.get("user_input", "").split("+")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.get_product_info(user_input)

    return JsonResponse(response)


def buy_product(request):
    user_input = request.GET.get("user_input", "").split("+")
    if not user_input:
        return JsonResponse({"error": "Input parameter is missing"}, status=400)

    response = routes.buy_product(user_input)

    return JsonResponse(response)
