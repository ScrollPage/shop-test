from django.shortcuts import render
from rest_framework import generics
from django.views import View
from rest_framework.response import Response
from account.api.serializers import RegistrationSerializer
# from django.views.decorators.csrf import ensure_csrf_cookie


class RegistrationView(View):
    # @ensure_csrf_cookie
    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data["response"] = "Successfully created a new user!"
        
        return Response(data)

