from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Accounts


class AccountsAdmin(UserAdmin):
    list_display = ('email', 'name', 'date_joined', 'last_login', 'is_admin', 'is_staff')
    search_fields = ('email', 'name')
    readonly_fields = ('id', 'date_joined', 'last_login')
    ordering = ('email',)

    filter_horizontal = ()
    list_filter = ()

    fieldsets = (
        (None, {'fields': ('email', 'name', 'date_joined', 'last_login')}),
        ('Permissions', {'fields': ('is_admin', 'is_staff')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2')
        }),
    )


admin.site.register(Accounts, AccountsAdmin)