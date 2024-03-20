import { ProductService } from '../../products/product.service';
import { Product } from '../../products/product.entity';
import { of } from 'rxjs';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let productService: ProductService;
  let productRepository: MockType<Repository<Product>>;

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const products = [new Product()];
      const result = of(products).toPromise();
      jest.spyOn(productRepository, 'find').mockImplementation(() => result);

      expect(await productService.getAllProducts()).toBe(result);
    });
  });

  describe('getProduct', () => {
    it('should return one product', async () => {
      const products = new Product();
      const result = of(products).toPromise();
      jest
        .spyOn(productRepository, 'findOneBy')
        .mockImplementation(() => result);

      expect(await productService.getProduct(1)).toBe(result);
    });
  });

  describe('deleteProduct', () => {
    it('should delete one product', async () => {
      const products = new Product();
      const result = of(products).toPromise();
      jest.spyOn(productRepository, 'delete').mockImplementation();

      expect(await productService.deleteProduct(1)).toBe(result);
    });
  });

  describe('createProduct', () => {
    it('should create one product', async () => {
      const products = new Product();
      const result = of(products).toPromise();
      jest.spyOn(productRepository, 'save').mockImplementation();

      expect(await productService.createProduct(new Product())).toBe(result);
    });
  });

  describe('updateProduct', () => {
    it('should update one product', async () => {
      const products = new Product();
      const result = of(products).toPromise();
      jest
        .spyOn(productRepository, 'findOneBy')
        .mockImplementation(() => result);
      jest.spyOn(productRepository, 'save').mockImplementation();

      expect(await productService.updateProduct(new Product(), 1)).toBe(result);
    });
  });
});
