from django.contrib import admin

from shipping.models import ShippingAddress


class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('user','city','zipcode')

admin.site.register(ShippingAddress, ShippingAddressAdmin)