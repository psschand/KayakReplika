from django.db import models

# Create your models here.
class Airline(models.Model):
    airline_name = models.CharField(max_length=100, unique=True)
    aircraft_type = models.CharField(max_length=100, blank=True, default='')

    def __str__(self):
        return self.airline_name

class Country(models.Model):
    state_location = models.CharField(max_length=100, blank=True, default='', unique=True)
    country_name = models.CharField(max_length=100, blank=True, default='')
    
    def __str__(self):
        return self.state_location
    

class Airport(models.Model):
    airport_name = models.CharField(max_length=100, unique=True)
    location = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='state')
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='country')

    def __str__(self):
        return self.airport_name

class TravelClass(models.Model):
    class_level = models.CharField(max_length=100, blank=True, default='')
    class_price = models.IntegerField()

    def __str__(self):
        return self.class_level

class Flight(models.Model):
    destiny = models.ForeignKey(Country, on_delete=models.CASCADE, to_field="state_location")
    airline_name = models.ForeignKey(Airline, on_delete=models.CASCADE, to_field="airline_name")
    departure_date = models.DateField(max_length=100, blank=True, default='')
    departure_time = models.CharField(max_length=100, blank=True, default='')
    departure_airport = models.ForeignKey(Airport, on_delete=models.CASCADE, to_field="airport_name")
    ticket_price = models.IntegerField()
    executive_capacity = models.IntegerField()
    turist_capacity = models.IntegerField()

    class Meta:
        ordering = ('ticket_price',)

    def __str__(self):
        return str(self.destiny)
