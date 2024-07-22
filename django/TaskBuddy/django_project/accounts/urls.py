from django.urls import path, include
from . import views
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.routers import DefaultRouter
# from .views import UserViewSet,RoleViewSet

# router = DefaultRouter()
# router.register(r'users', UserViewSet)
# router.register(r'roles', RoleViewSet)

urlpatterns = [
    # path('api/', include(router.urls)),
    path('api/roles/', views.RoleViewSet.as_view()),
    path('api/auth/', include('rest_framework.urls')),
]
