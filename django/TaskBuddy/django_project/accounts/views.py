from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .serializers import UserSerializer, RoleSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Role
from rest_framework.views import APIView

User = get_user_model()

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#     @action(detail=False, methods=['post'])
#     def register(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
#
#     @action(detail=False, methods=['post'])
#     def login(self, request):
#         user = authenticate(email=request.data.get('email'), password=request.data.get('password'))
#         if user is not None:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'access': str(refresh.access_token),
#                 'refresh': str(refresh),
#             })
#         return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
#
#     @action(detail=False, methods=['post'])
#     def refresh(self, request):
#         refresh = RefreshToken(request.data.get('refresh'))
#         return Response({
#             'access': str(refresh.access_token),
#         })
#
#     @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
#     def users(self, request):
#         users = User.objects.all()
#         serializer = self.get_serializer(users, many=True)
#         return Response(serializer.data)
# from django.shortcuts import render
#

class RoleViewSet(APIView):
    def get(self,request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles,many=True)
        return Response(serializer.data)