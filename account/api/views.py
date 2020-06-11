from django.shortcuts import render
from rest_framework import generics
from django.views import View
from rest_framework.respone import Response
from account.api.serializers import RegistrationSerializer

class RegistrationView(View):

    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data["response"] = "Successfully created a new user!"
        
        return Response(data)

