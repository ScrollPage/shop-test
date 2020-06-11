from django.shortcuts import render
from rest_framework import generics
from api.serializers import ProductSerializer, CountSerializer
from api.models import Product, ProductCount

def f(page, amount, queryset):
	i = 0
	while int(page) != i:
		i += 1

	return queryset[amount*i : amount*(i + 1)]

class ProductListView(generics.ListAPIView):
	serializer_class = ProductSerializer

	def get_queryset(self):
		page = self.kwargs["page"]
		amount = self.kwargs["amount"]
		categoryId = self.kwargs["categoryId"]

		try:
			page = int(page) - 1
		except:
			page = 0
		try:
			amount = int(amount)
		except:
			amount = 6
		try:
			if int(categoryId) == 0:
				categoryId = 0
		except:
			categoryId = 0

		if categoryId == 0:
			queryset = Product.objects.all()
			queryset = f(page, amount, queryset)
		else:
			queryset = Product.objects.all()
			queryset1 = []
			for product in queryset:
				if str(product.categoryId) in categoryId:
					queryset1.append(product)
			queryset = f(page, amount, queryset1)

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

