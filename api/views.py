from django.shortcuts import render
from rest_framework import generics
from api.serializers import ProductSerializer, CountSerializer
from api.models import Product, ProductCount

class Categories():
	def __init__(self, name):
		if name == "Apple":
			self.cat = 1
		elif name == "Samsung":
			self.cat = 2
		elif name == "HTC":
			self.cat = 3
		elif name == "Lenovo":
			self.cat = 4
		else:
			self.cat = 5

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

		categoryId = categoryId.split(",")

		if len(categoryId) != 5:
			new_category_arr = []
			for cat in categoryId:
				new_category_arr.append(Categories(cat).cat)
			queryset = Product.objects.all()
			queryset1 = []
			for product in queryset:
				if product.categoryId in new_category_arr:
					queryset1.append(product)
			queryset = f(page, amount, queryset1)
		else:
			queryset = Product.objects.all()
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

