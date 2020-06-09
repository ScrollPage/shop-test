from django.contrib import admin
from api.models import Product

@admin.register(Product)
class TodoItemAdmin(admin.ModelAdmin):
	list_display = ('categoryId', 'name', 'description', 'price')
