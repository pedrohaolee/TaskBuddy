from django.http import HttpResponse
from .models import Members

def index(request):
    members = Members.objects.all()[5:10]
    output = '. '.join([member.name for member in members])
    return HttpResponse(output)

def add_member(request):
    member = Members(name='Harry')
    member.save()
    return HttpResponse('created')

def update_member(request):
    member=Members.objects.get(name='Harry')
    member.name='HARRY'
    member.save()
    return HttpResponse('updated')

def del_member(request):
    member=Members.objects.filter(name='HARRY')
    member.delete()
    return HttpResponse('deleted')

# def home(request):
#     return HttpResponse('home')
#
# def cost(request):
#     return HttpResponse('cost')
