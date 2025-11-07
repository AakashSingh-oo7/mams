package in.aakash.mams.service.impl;

import in.aakash.mams.entity.CategoryEntity;
import in.aakash.mams.entity.ItemEntity;
import in.aakash.mams.io.ItemRequest;
import in.aakash.mams.io.ItemResposne;
import in.aakash.mams.repository.CategoryRepository;
import in.aakash.mams.repository.ItemREpository;
import in.aakash.mams.service.FileUploadService;
import in.aakash.mams.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final FileUploadService  fileUploadService;
    private final CategoryRepository categoryRepository;
    private final ItemREpository itemREpository;


    @Override
    public ItemResposne add(ItemRequest request, MultipartFile file) {
        String imgUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem= convertToEntity(request);
       CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found : " + request.getCategoryId()));
       newItem.setCategory(existingCategory);
       newItem.setImgUrl(imgUrl);
       newItem = itemREpository.save(newItem);
          return convertToResponse(newItem);

    }

    private ItemResposne convertToResponse(ItemEntity newItem) {
       return ItemResposne.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
       return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();

    }

    @Override
    public List<ItemResposne> fetchItems() {
        return itemREpository.findAll()
                .stream()
                .map(itemEntity ->  convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingItem = itemREpository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found : " + itemId));
        boolean isFileDeleted = fileUploadService.deleteFile(existingItem.getImgUrl());
        if (isFileDeleted) {
            itemREpository.delete(existingItem);
        }else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete file");

        }
    }
}
