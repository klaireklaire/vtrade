import hashlib
from django.http import JsonResponse
from django.db.models import Q
from decimal import Decimal
from .models import CustomUser, Listing, AppImage


# User routes
def add_user(user_input):
    first_name, last_name, class_year, email, username, password = user_input
    hashed_password = hashlib.sha256(password.replace(" ", "").encode()).hexdigest()

    # Create a new user object with the provided data
    new_user = CustomUser(
        first_name=first_name,
        last_name=last_name,
        email=email,
        username=username,
        password=hashed_password,
        classyear=class_year,
    )

    instance = CustomUser.objects.create(new_user)

    return JsonResponse({"message": "Data created successfully"})


def update_user(user_input):
    # Parse the user input
    parsed_input = parse_user_input(user_input)

    # Get the user object to update
    user_id = parsed_input.get("id")  # Assuming 'id' is provided in user_input
    try:
        user = CustomUser.objects.get(pk=user_id)
    except CustomUser.DoesNotExist:
        return {"error": "User not found"}, 404

    # Update the user object with the provided fields
    for field, value in parsed_input.items():
        if hasattr(user, field):
            setattr(user, field, value)

    # Save the updated user object
    user.save()

    return {"message": "User updated successfully"}


def parse_user_input(user_input):
    parsed_data = {}

    # implement logic for parsing
    # for value in user_input:

    return parsed_data


def login_user(user_input):
    id = user_input[0]
    try:
        user = CustomUser.objects.get(id=id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    return user


def remove_user(user_input):
    id = user_input[0]
    try:
        user = CustomUser.objects.get(id=id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    user.delete()

    return JsonResponse({"message": "User deleted successfully"})


def forgot_password(user_input):
    email = user_input
    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    return


def reset_password(user_input):
    email, password = user_input
    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    user.password = password
    user.save()

    return JsonResponse({"message": "User password updated successfully"})


# Listing Routes


def post_listing(user_input):

    if len(user_input) not in (17, 18):
        return JsonResponse({"error": "Invalid input format"}, status=400)

    image_urls = user_input[:7]
    title = user_input[7]
    category = user_input[8]
    condition = user_input[9]
    payment_method = user_input[10]
    description = user_input[11]
    location = user_input[12]
    form = user_input[13]
    listing_type = user_input[14]
    status = user_input[15]

    if len(user_input) == 17:
        price = Decimal(user_input[16])
        min_price = None
        max_price = None
    else:
        min_price = Decimal(user_input[16])
        max_price = Decimal(user_input[17])
        price = None
        image_instances = []

    # Iterate over the image URLs
    for url in image_urls:
        image_instance = AppImage.objects.create(image_url=url)
        image_instances.append(image_instance)

    listing = Listing.objects.create(
        title=title,
        category=category,
        condition=condition,
        price=price,
        minprice=min_price,
        maxprice=max_price,
        paymentmethod=payment_method,
        description=description,
        location=location,
        form=form,
        listingtype=listing_type,
        status=status,
        clicked=0,
    )

    listing.images.add(*image_instances)

    return JsonResponse({"success": "Listing created successfully"})


def filter_price(user_input):
    price = user_input[0]

    min_price = user_input[1]
    max_price = user_input[2]

    # Construct the filter query
    if price:
        # Filter by price if price is not None
        listings = Listing.objects.filter(price__lte=price)
    else:
        # Filter by minprice and maxprice if price is None
        listings = Listing.objects.filter(
            minprice__lte=min_price, maxprice__gte=max_price
        )

    return listings


def display_top_sale():
    top_sale = Listing.objects.filter(form="provide").order_by("-clicked")[:10]
    return top_sale


def display_top_request():
    top_request = Listing.objects.filter(form="request").order_by("-clicked")[:10]
    return top_request


def display_recent_post():
    recent_post = Listing.objects.order_by("-createdate")[:5]
    return recent_post


def get_items(user_input):
    category = user_input
    try:
        listing = Listing.objects.get(category=category)
    except Listing.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    return listing


def get_product_info(user_input):
    id = user_input
    try:
        listing = Listing.objects.get(id=id)
    except Listing.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    track_clicks(listing)
    return listing


def track_clicks(listing):
    listing.clicked = listing.clicked + 1
    listing.save()
    return


def buy_product(user_input):
    id = user_input[0]
    try:
        listing = Listing.objects.get(id=id)
    except Listing.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    listing.status = False
    listing.save()

    return listing
