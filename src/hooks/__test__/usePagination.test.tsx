import { renderHook, act } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination Hook", () => {
  const mockData = Array.from({ length: 10 }, (_, i) => i + 1);
  const itemsPerPage = 3;

  test("initial state is set correctly", () => {
    const { result } = renderHook(() =>
      usePagination({ data: mockData, itemsPerPage })
    );

    expect(result.current.currentPage).toBe(0);
    expect(result.current.pageCount).toBe(4);
    expect(result.current.paginatedData).toEqual([1, 2, 3]);
  });

  test("goToNextPage moves to next page", () => {
    const { result } = renderHook(() =>
      usePagination({ data: mockData, itemsPerPage })
    );

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginatedData).toEqual([4, 5, 6]);
  });

  test("goToPrevPage moves back a page", () => {
    const { result } = renderHook(() =>
      usePagination({ data: mockData, itemsPerPage })
    );

    act(() => {
      result.current.goToNextPage();
      result.current.goToNextPage();
      result.current.goToPrevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginatedData).toEqual([4, 5, 6]);
  });

  test("goToNextPage does not exceed last page", () => {
    const { result } = renderHook(() =>
      usePagination({ data: mockData, itemsPerPage })
    );

    act(() => {
      result.current.goToNextPage();
      result.current.goToNextPage();
      result.current.goToNextPage();
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.paginatedData).toEqual([10]);
  });

  test("goToPrevPage does not go below first page", () => {
    const { result } = renderHook(() =>
      usePagination({ data: mockData, itemsPerPage })
    );

    act(() => {
      result.current.goToPrevPage();
    });

    expect(result.current.currentPage).toBe(0);
    expect(result.current.paginatedData).toEqual([1, 2, 3]);
  });

  test("goToPage moves to a specific page", () => {
    const { result } = renderHook(() =>
      usePagination({ data: mockData, itemsPerPage })
    );

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData).toEqual([7, 8, 9]);
  });

  test("setCurrentPage updates correctly", () => {
    const { result } = renderHook(() =>
      usePagination({ data: mockData, itemsPerPage })
    );

    act(() => {
      result.current.setCurrentPage(1);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginatedData).toEqual([4, 5, 6]);
  });
});
