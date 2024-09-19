from django.db import models


class ProductModel(models.Model):
    """Модель продукта"""

    name = models.CharField('Название', max_length=10)
    description = models.TextField('Описание')
    price = models.FloatField('Цена')

    class Meta:
        verbose_name = 'продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self) -> str:
        return self.name
