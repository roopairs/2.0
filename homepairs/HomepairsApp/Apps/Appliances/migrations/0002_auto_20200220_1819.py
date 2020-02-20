# Generated by Django 3.0.2 on 2020-02-20 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Appliances', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appliance',
            name='description',
        ),
        migrations.AddField(
            model_name='appliance',
            name='category',
            field=models.CharField(default='unspecified', max_length=100),
        ),
        migrations.AddField(
            model_name='appliance',
            name='manufacturer',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='appliance',
            name='modelNum',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='appliance',
            name='serialNum',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='appliance',
            name='location',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='appliance',
            name='rooAppId',
            field=models.IntegerField(null=True),
        ),
    ]
