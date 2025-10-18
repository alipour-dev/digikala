from django.shortcuts import render


def home(request):
    r = render(request, 'home.html')
    return render(request, 'home.html')
