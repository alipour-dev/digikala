from django.contrib import admin

from basket.models import Basket, Basketline

class BasketlineInline(admin.TabularInline):
    model = Basketline
class BasketAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    inlines = (BasketlineInline,)

class BasketlineAdmin(admin.ModelAdmin):
    list_display = ('basket', 'product', 'quantity')


admin.site.register(Basketline,BasketlineAdmin)
admin.site.register(Basket,BasketAdmin)

