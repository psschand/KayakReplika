from django.contrib import admin
from kayak_app.models import Airline,Airport,TravelClass,Flight,Country

# Register your models here.
admin.site.register(Airline)
admin.site.register(Country)
admin.site.register(Airport)
admin.site.register(TravelClass)
admin.site.register(Flight)

