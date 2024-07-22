from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import TaskSerializer
from .models import Task
from rest_framework_simplejwt.authentication import JWTAuthentication

class JwtDetails(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self,request):
        response = JWTAuthentication().authenticate(request)
        if response is not None:
            account, token = response

            print(account)
            print(account.id)
            print(account.name)

            return Response(token.payload)


# class Task(APIView):
#     def get(self,request):
#         tasks = Task.objects.all()
#         serializer = TaskSerializer(tasks,many=True)
#         return Response(serializer.data)
#
#     def put(self,request):
#         serializer = TaskSerializer(data=request.data)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)
#

class TaskList(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self,request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks,many=True)
        return Response(serializer.data)

class TaskDetail(APIView):
    def get(self,request,pk):
        tasks = Task.objects.get(id=pk)
        # serializer = TaskSerializer(tasks,many=False)
        serializer = TaskSerializer(tasks)
        return Response(serializer.data)

class TaskCreate(APIView):
    def put(self,request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class TaskDelete(APIView):
    def delete(self,request,pk):
        task = Task.objects.get(id=pk)
        task.delete()

        return Response('item deleted')

class TaskUpdate(APIView):
    def patch(self,request,pk):
        task = Task.objects.get(id=pk)
        serializer = TaskSerializer(instance=task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

