export class Web3Error extends Error {
  code?: string
  
  constructor(message: string, code?: string) {
    super(message)
    this.name = 'Web3Error'
    this.code = code
  }
}

export const handleError = (error: any): string => {
  console.error('Error occurred:', error)
  
  // Handle specific error types
  if (error.code === 'ACTION_REJECTED') {
    return 'Transaction was rejected by user'
  }
  
  if (error.code === 'INSUFFICIENT_FUNDS') {
    return 'Insufficient funds for transaction'
  }
  
  if (error.code === 'NETWORK_ERROR') {
    return 'Network error. Please check your connection'
  }
  
  if (error.code === 'CALL_EXCEPTION') {
    return 'Smart contract call failed. Please check your input'
  }
  
  if (error.message?.includes('user rejected')) {
    return 'Transaction was rejected by user'
  }
  
  if (error.message?.includes('insufficient funds')) {
    return 'Insufficient funds for transaction'
  }
  
  if (error.message?.includes('network')) {
    return 'Network error. Please try again'
  }
  
  if (error.message?.includes('gas')) {
    return 'Gas estimation failed. Please try with a higher gas limit'
  }
  
  // Default error message
  return error.message || 'An unexpected error occurred'
}

export const formatErrorForUI = (error: any): { title: string; message: string } => {
  const message = handleError(error)
  
  if (message.includes('rejected')) {
    return {
      title: 'Transaction Cancelled',
      message: 'You cancelled the transaction in your wallet'
    }
  }
  
  if (message.includes('insufficient')) {
    return {
      title: 'Insufficient Balance',
      message: 'You don\'t have enough tokens for this transaction'
    }
  }
  
  if (message.includes('network')) {
    return {
      title: 'Network Error',
      message: 'Please check your internet connection and try again'
    }
  }
  
  return {
    title: 'Transaction Failed',
    message
  }
}
