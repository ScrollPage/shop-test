from django.db import models

class Product(models.Model):
	categoryId = models.IntegerField(default = 0)
	name = models.CharField(max_length = 50)
	description = models.CharField(max_length = 250)
	price = models.IntegerField(default = 0)
	image = models.CharField(max_length = 100)
	cpu = models.CharField(max_length = 100)
	camera = models.CharField(max_length = 100)
	size = models.CharField(max_length = 100)
	weight = models.CharField(max_length = 100)
	display = models.CharField(max_length = 100)
	battery = models.CharField(max_length = 100)
	memory = models.CharField(max_length = 100)



