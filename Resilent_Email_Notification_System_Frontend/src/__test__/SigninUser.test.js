import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'; // Import fireEvent and screen
import { MemoryRouter } from 'react-router-dom';
import SigninUser from '../user/SigninUser'; // Adjust the import path based on your project structure

// Mock the useNavigate function
const mockNavigate = jest.fn();

// Mock the useAuth function
jest.mock('../admin/AuthContext', () => ({
  useAuth: () => ({
    userAuthenticated: true, // Adjust this value as needed for your test cases
  }),
}));

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SigninUser Component', () => {
  it('should render the component when authenticated', () => {
    // Mock the useAuth function to return true
    jest.clearAllMocks();
    jest.mock('../admin/AuthContext', () => ({
      useAuth: () => ({
        userAuthenticated: true,
      }),
    }));

    render(
      <MemoryRouter>
        <SigninUser />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('User Modification')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should navigate to ModifyUser when "User Modification" button is clicked', () => {
    jest.clearAllMocks(); // Clear any previous mock function calls

    render(
      <MemoryRouter>
        <SigninUser />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('User Modification'));
    expect(mockNavigate).toHaveBeenCalledWith('/ModifyUser', {
      state: { userEmail: undefined }, // Update with your test data
    });
  });

  it('should navigate to DeleteUser when "Delete" button is clicked', () => {
    jest.clearAllMocks(); // Clear any previous mock function calls

    render(
      <MemoryRouter>
        <SigninUser />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockNavigate).toHaveBeenCalledWith('/DeleteUser', {
      state: { userEmail: undefined }, // Update with your test data
    });
  });
});
