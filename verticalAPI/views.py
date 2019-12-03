from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['GET', 'POST'])
def testVert(request):
   print("Printing data.")
#   print(request.data)
   print("Printing data end.")
   response = "hello world"
   return Response(data=response)
