from django.shortcuts import render
from rest_framework import generics
from api.serializers import ProductSerializer, CountSerializer
from api.models import Product, ProductCount

def f(page, amount, queryset):
	i = 0
	print(page)
	while int(page) != i:
		i += 1

	print(i)

	return queryset[amount*i : amount*(i + 1)]

class ProductListView(generics.ListAPIView):
	serializer_class = ProductSerializer

	def get_queryset(self):
		page = self.kwargs["page"]
		amount = self.kwargs["amount"]
		categoryId = self.kwargs["categoryId"]
		print(self.request.auth)

		try:
			page = int(page) - 1
		except:
			page = 0
		try:
			amount = int(amount)
		except:
			amount = 6
		try:
			categoryId = int(categoryId)
		except:
			categoryId = 0


		if categoryId == 0:
			queryset = Product.objects.all()
			queryset = f(page, amount, queryset)
		else:
			queryset = Product.objects.filter(categoryId = categoryId).all()
			queryset = f(page, amount, queryset)

		return queryset


class SingleProductView(generics.ListAPIView):
	serializer_class = ProductSerializer

	def get_queryset(self):
		uid = self.kwargs["uid"]
		try:
			uid = int(uid)
		except:
			uid = 1

		queryset = Product.objects.filter(id = uid).all()

		return queryset

class ProductsCountView(generics.ListAPIView):
	serializer_class = CountSerializer

	def get_queryset(self):
		queryset = ProductCount.objects.all()
		return queryset
# Create your views here.
