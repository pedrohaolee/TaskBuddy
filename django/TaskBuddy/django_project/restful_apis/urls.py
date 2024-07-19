from django.urls import path
from . import views

urlpatterns = [
    path('task_list/', views.TaskList.as_view()),
    path('task_detail/<int:pk>/', views.TaskDetail.as_view()),
    path('task_create/', views.TaskCreate.as_view()),
    path('task_update/<int:pk>/', views.TaskUpdate.as_view()),
    path('task_delete/<int:pk>/', views.TaskDelete.as_view()),
    path('jwt_details/', views.JwtDetails.as_view()),
    # path('task/', views.Task.as_view())
]

