package in.aakash.mams.service;

import in.aakash.mams.io.CategoryRequest;
import in.aakash.mams.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request , MultipartFile file);
    List<CategoryResponse> read();

    void delete(String categoryId);
}
