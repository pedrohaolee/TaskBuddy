from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        # fields = ['task','completed']
        # or (but cannot use both)
        # exclude = ['completed']

    def validate_title(self,value):
        if len(value) < 5:
            raise serializers.ValidationError('title has to be at least 5 characters long')
        return value