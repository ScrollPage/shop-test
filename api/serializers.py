from rest_framework import serializers
from api.models import Product, ProductCount

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = [
			'id', 
			'categoryId', 
			'name', 
			'description', 
			'price', 
			'image', 
			'cpu', 
			'camera', 
			'size', 
			'weight', 
			'display', 
			'battery', 
			'memory',
		]

class CountSerializer(serializers.ModelSerializer):
	class Meta():
		model = ProductCount
		fields = [
			"total",
		]