package in.aakash.mams.service;

import in.aakash.mams.io.UserRequest;
import in.aakash.mams.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> readUsers();
    void deleteUser(String id);


}
