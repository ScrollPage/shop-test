from api.help_classes import Categories
from api.models import Product

def f(page, amount, queryset):
	i = 0
	while int(page) != i:
		i += 1

	return queryset[amount*i : amount*(i + 1)]

def transform_cat(categoryId):
	new_category_arr = []
	for cat in categoryId:
		new_category_arr.append(Categories(cat).cat)
	queryset = Product.objects.all()
	queryset1 = []
	for product in queryset:
		if product.categoryId in new_category_arr:
			queryset1.append(product)
	
	return queryset1