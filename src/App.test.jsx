import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as PhotoService from './service/PhotoService';

// Mock PrimeReact components for predictable tests
vi.mock('primereact/galleria', () => ({
  Galleria: ({ item }) => <div data-testid="galleria">{item && item()}</div>,
}));
vi.mock('primereact/dialog', () => ({
  Dialog: ({ visible, children }) => (visible ? <div>{children}</div> : null),
}));
vi.mock('primereact/button', () => ({
  Button: ({ label, ...rest }) => <button {...rest}>{label}</button>,
}));
vi.mock('primereact/tooltip', () => ({ Tooltip: () => null }));

// mock PhotoService to return known images
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

beforeEach(() => {
  vi.spyOn(PhotoService.PhotoService, 'getImages').mockResolvedValue(PhotoService.PhotoService.getData());
});

afterEach(() => {
  vi.restoreAllMocks();
});

function setup() {
  return render(<App />);
}

// Helper to wait until images are loaded and first image displayed
async function waitForImages() {
  await waitFor(() => expect(screen.getByRole('img', { name: /description for image 1/i })).toBeInTheDocument());
}

test('loads artist details and selected image on start', async () => {
  setup();
  await waitForImages();
  expect(screen.getAllByText(/Noa Guez/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText((t) => t.includes('נועה גז')).length).toBeGreaterThan(0);
  const mainImage = within(screen.getByTestId('galleria')).getByRole('img', { name: /description for image 1/i });
  expect(mainImage).toBeInTheDocument();
});

test('root container prevents overflow', () => {
  const { container } = render(<App />);
  const rootDiv = container.firstChild;
  expect(rootDiv).toHaveStyle({ overflow: 'hidden' });
});

test('clicking thumbnail updates main image', async () => {
  setup();
  await waitForImages();
  const secondThumb = screen.getByRole('button', { name: /description for image 2/i });
  await userEvent.click(secondThumb);
  await waitFor(() => expect(within(screen.getByTestId('galleria')).getByRole('img', { name: /description for image 2/i })).toBeInTheDocument());
});

test('clicking main image opens forward form', async () => {
  setup();
  await waitForImages();
  const mainImage = within(screen.getByTestId('galleria')).getByRole('img', { name: /description for image 1/i });
  await userEvent.click(mainImage);
  expect(await screen.findByText(/Forward to Printing Provider/i)).toBeInTheDocument();
});

test('scrolling thumbnails with buttons', async () => {
  setup();
  await waitForImages();
  const rightBtn = screen.getByRole('button', { name: /scroll thumbnails right/i });
  await userEvent.click(rightBtn);
  await waitFor(() => expect(within(screen.getByTestId('galleria')).getByRole('img', { name: /description for image 2/i })).toBeInTheDocument());
  const leftBtn = screen.getByRole('button', { name: /scroll thumbnails left/i });
  await userEvent.click(leftBtn);
  await waitFor(() => expect(within(screen.getByTestId('galleria')).getByRole('img', { name: /description for image 1/i })).toBeInTheDocument());
});

test('disable scroll at ends', async () => {
  setup();
  await waitForImages();
  const leftBtn = screen.getByRole('button', { name: /scroll thumbnails left/i });
  await waitFor(() => expect(leftBtn).toBeDisabled());

  const rightBtn = screen.getByRole('button', { name: /scroll thumbnails right/i });
  for (let i = 0; i < PhotoService.PhotoService.getData().length - 1; i++) {
    await userEvent.click(rightBtn);
  }
  await waitFor(() => expect(rightBtn).toBeDisabled());
});

