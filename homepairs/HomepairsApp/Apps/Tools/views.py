import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .models import APIKey

@method_decorator(csrf_exempt, name='dispatch')
class APIKeyView(View):
    def get(self, request):
        apikey = APIKey.objects.get()
        data = {
                   'apikey': apikey.getKey()
               }
        return JsonResponse(data=data)
