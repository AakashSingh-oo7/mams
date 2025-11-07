package in.aakash.mams.service;

import in.aakash.mams.io.ItemRequest;
import in.aakash.mams.io.ItemResposne;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResposne add(ItemRequest request, MultipartFile file);
    List<ItemResposne> fetchItems();
    void deleteItem(String itemId);
}
